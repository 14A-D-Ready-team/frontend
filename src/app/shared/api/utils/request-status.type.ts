export interface ApiRequestStatus {
  loading: boolean;
  error?: any;
}

export interface TargetedRequestStatus extends ApiRequestStatus {
  targetId: number;
}
