import { LogConfig } from './fc-service';

export interface TriggerConfig {
  name: string;
  type: 'oss' | 'log' | 'timer' | 'http' | 'mnsTopic' | 'cdnEvents';
  role?: string;
  sourceArn?: string;
  config: OssTriggerConfig | LogTriggerConfig | TimerTriggerConfig | HttpTriggerConfig | MnsTriggerConfig | CdnTriggerConfig;
}

export interface OssTriggerConfig {
  bucketName: string;
  events: string[];
  filter: filterConfig;
}

export interface filterConfig {
  Key: {
    Prefix: string;
    Suffix: string;
  };
}

export interface LogTriggerConfig {
  jobConfig: LogTriggerJobConfig;
  logConfig: LogConfig;
  functionParameter?: {
    [key: string]: any;
  };
  sourceConfig: LogTriggerSourceConfig;
  enable: boolean;
}

export interface LogTriggerJobConfig {
  maxRetryTime?: string;
  triggerInterval?: string;
}

export interface LogTriggerSourceConfig {
  logstore: string;
}

export interface TimerTriggerConfig {
  cronExpression: string;
  enable: boolean;
  payload: string;
}

export interface HttpTriggerConfig {
  authType: string;
  methods: string[];
}

export interface MnsTriggerConfig {
  topicName: string;
  region?: string;
  notifyContentFormat?: 'STREAM' | 'JSON';
  notifyStrategy?: 'BACKOFF_RETRY' | 'EXPONENTIAL_DECAY_RETRY';
  filterTag?: string;
}

export interface CdnTriggerConfig {
  eventName: string;
  eventVersion: string;
  notes: string;
  filter: CdnFilterConfig;
}

export interface CdnFilterConfig {
  domain: string[];
}
