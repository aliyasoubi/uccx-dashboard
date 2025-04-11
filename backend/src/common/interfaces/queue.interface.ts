export interface VoiceIAQStats {
  id: number;
  esdId: number;
  esdName: string;
  nResourcesLoggedIn: number;
  nTotalContacts: number;
  nHandledContacts: number;
  nAbandonedContacts: number;
  longestTalkDuration: number;
  longestWaitDuration: number;
  longestCurrentlyWaitingCallStartTime: number;
  nAvailResources: number;
  nInSessionResources: number;
  nUnavailResources: number;
  nWorkResources: number;
  nSelectedResources: number;
  nAgentsAdded: number;
  nAgentsRemoved: number;
  nWaitingContacts: number;
  nAverageHandlingTimeLowThreshold: number;
  nAverageWaitingTimeLowThreshold: number;
  nAverageWaitingTimeHighThreshold: number;
  nAbandonedCallsLowThreshold: number;
  nAbandonedCallsHighThreshold: number;
  nDequeuedCallsLowThreshold: number;
  nDequeuedCallsHighThreshold: number;
  nSLAPercentageLowThreshold: number;
  nAverageHandlingTimeHighThreshold: number;
  nSLAPercentageHighThreshold: number;
}

export interface QueueData {
  id: string;
  operation: string;
  VoiceIAQStats: VoiceIAQStats;
} 