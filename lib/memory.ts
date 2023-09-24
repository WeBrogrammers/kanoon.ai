import {Redis} from '@upstash/redis'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {PineconeClient} from '@pinecone-database/pinecone'
import {PineconeStore} from "langchain/vectorstores/pinecone"

export type LawyerKey = {
    lawyerName:string;
    modelName:string;
    userId:string;
}

// class MemoryManager that is designed to manage memory, specifically for storing and retrieving chat history and performing vector searches
export class MemoryManager {
  private static instance: MemoryManager;
  private history: Redis;
  private vectorDBClient: PineconeClient;

  //initializes two properties: history (a Redis client) and vectorDBClient (a PineconeClient).
  public constructor() {
    this.history = Redis.fromEnv();
    this.vectorDBClient = new PineconeClient();
  }

  //   initializing the PineconeClient
  public async init() {
    if (this.vectorDBClient instanceof PineconeClient) {
      await this.vectorDBClient.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
      });
    }
  }

  //   vector search using Pinecone and OpenAI's embeddings.
  public async vectorSearch(recentChatHistory: string, lawyerFileName: string) {
    const pineconeClient = <PineconeClient>this.vectorDBClient;

    const pineconeIndex = pineconeClient.Index(
      process.env.PINECONE_INDEX! || ""
    );

    // get vector store
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
      { pineconeIndex }
    );

    // takes a recent chat history and a lawyer's file name as input, retrieves a vector store, and performs similarity searches. The results are returned.
    const similarDocs = await vectorStore
      .similaritySearch(recentChatHistory, 3, { fileName: lawyerFileName })
      .catch((err) => {
        console.log("WARNING: failed to get vector search results.", err);
      });
    return similarDocs;
  }

  //   It creates and initializes an instance if it doesn't already exist.
  public static async getInstance(): Promise<MemoryManager> {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
      await MemoryManager.instance.init();
    }
    return MemoryManager.instance;
  }

  //   generates a unique Redis key based on the lawyer's information
  private generateRedisLawyerKey(lawyerKey: LawyerKey): string {
    return `${lawyerKey.lawyerName}-${lawyerKey.modelName}-${lawyerKey.userId}`;
  }

  //   responsible for adding a new chat message to a user's chat history in Redis.
  public async writeToHistory(text: string, lawyerKey: LawyerKey) {
    if (!lawyerKey || typeof lawyerKey.userId == "undefined") {
      console.log("Lawyer key set incorrectly!!");
      return "";
    }
    const key = this.generateRedisLawyerKey(lawyerKey);
    const result = await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });
    return result;
  }

  //   retrieves the latest chat history for a lawyer
  public async readLatestHistory(lawyerKey: LawyerKey): Promise<string> {
    if (!lawyerKey || typeof lawyerKey.userId == "undefined") {
      console.log("Lawyer key set incorrectly");
      return "";
    }

    const key = this.generateRedisLawyerKey(lawyerKey);
    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });

    result = result.slice(-30).reverse();
    const recentChats = result.reverse().join("\n");
    return recentChats;
  }

  //   method  initializes a user's chat history by adding some initial chat messages to their history.(human & ai chat history in train lawyer form)
  public async seedChatHistory(
    seedContent: String,
    delimiter: string = "\n",
    lawyerKey: LawyerKey
  ) {
    const key = this.generateRedisLawyerKey(lawyerKey);
    if (await this.history.exists(key)) {
      console.log("User already has chat history");
      return;
    }
    const content = seedContent.split(delimiter);
    let counter = 0;
    for (const line of content) {
      await this.history.zadd(key, { score: counter, member: line });
      counter += 1;
    }
  }
}