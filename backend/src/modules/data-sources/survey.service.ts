import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

interface SurveyData {
  id: string;
  name: string;
  metrics: {
    totalResponses: number;
    averageScore: number;
    completionRate: number;
    positiveResponses: number;
  };
}

@Injectable()
export class SurveyService {
  private logger = new Logger(SurveyService.name);
  private surveyData: Map<string, SurveyData> = new Map();

  constructor() {
    this.surveyData.set('survey1', {
      id: 'survey1',
      name: 'Customer Satisfaction Survey',
      metrics: {
        totalResponses: 200,
        averageScore: 4.5,
        completionRate: 0.85,
        positiveResponses: 180,
      },
    });
  }

  async getSurveyData(surveyId: string): Promise<SurveyData | undefined> {
    return this.surveyData.get(surveyId);
  }

  async getHistoricalData(
    surveyId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<SurveyData[]> {
    return [
      {
        id: surveyId,
        name: 'Customer Satisfaction Survey',
        metrics: {
          totalResponses: 250,
          averageScore: 4.6,
          completionRate: 0.88,
          positiveResponses: 220,
        },
      },
    ];
  }
} 