export interface ResourceIAQStats {
  resourceId: string;
  resourceName: string;
  timeChangedStateMillis: number;
  nHandledContacts: number;
  nPresentedContacts: number;
  avgTalkDuration: number;
  longestTalkDuration: number;
  avgHoldDuration: number;
  longestHoldDuration: number;
  avgWorkDuration: number;
  totalTalkTime: number;
  totalHoldTime: number;
  maxReadyTime: number;
  avgReadyTime: number;
  totalReadyTime: number;
  maxNotReadyTime: number;
  avgNotReadyTime: number;
  totalNotReadyTime: number;
  maxWorkTime: number;
  totalWorkTime: number;
  logonDuration: number;
  avgSpeedOfAnswer: number;
  rsrcCurrentStateReason: string;
  strResourceState: string;
  resourceBusySubState: string;
}

export interface OperatorData {
  id: string;
  operation: string;
  publishedTime: number;
  ResourceIAQStats: ResourceIAQStats;
} 