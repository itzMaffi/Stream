export interface IRecentThought {
  id: string;
  digest: string;
}

const MAX_ITEMS = 8;

const RECENT_THOUGHT_LOCAL_STORAGE_KEY = "recentThoughts";

export class RecentThoughtService {
  public save = (recent: IRecentThought) => {
    // read current local storage
    let currentStorage = this.read();

    const existingItem = currentStorage.find(item => item.id === recent.id);

    if (existingItem !== undefined) {
      const index = currentStorage.indexOf(existingItem);
      currentStorage.splice(index, 1);
    }

    if (currentStorage.length >= 8) currentStorage = currentStorage.slice(0, 9);
    currentStorage.unshift(recent);

    // save to local storage
    const updatedContent = JSON.stringify(currentStorage);
    localStorage.setItem(RECENT_THOUGHT_LOCAL_STORAGE_KEY, updatedContent);
  };

  public read = (): Array<IRecentThought> => {
    const currentStorageJson = localStorage.getItem(RECENT_THOUGHT_LOCAL_STORAGE_KEY) || "[]";
    const currentStorage = JSON.parse(currentStorageJson) as Array<IRecentThought>;
    return currentStorage;
  };

  public getDigest = (content: string): string => {
    if (!content) return "";
    if (content.length < 8) return content;

    return content.substring(0, 7) + "...";
  };
}
