export interface ApiRequestStatus {
  loading: boolean;
  error?: any;
}

export interface TargetedRequestStatus extends ApiRequestStatus {
  targetId: number;
}

/**
 * Creates an ApiRequestStatus that represents a loading status.
 * The loading status has a target id (e.g update and delete operations)
 *
 * @param id The id of the target entity
 */
export function createLoadingStatus(id: number): TargetedRequestStatus;
/**
 * Creates an ApiRequestStatus that represents a loading status.
 * The loading status doesn't have a target or the id is not yet know (e.g create operation)
 */
export function createLoadingStatus(): ApiRequestStatus;
export function createLoadingStatus(id?: number): unknown {
  return {
    loading: true,
    error: undefined,
    ...(id !== undefined ? { targetId: id } : {}),
  };
}

/**
 * Creates an ApiRequestStatus that represents a failed status.
 * The failed status has a target id (e.g update and delete operations)
 *
 * @param id The id of the target entity
 */
export function createFailedStatus(
  error: unknown,
  id: number,
): TargetedRequestStatus;
/**
 * Creates an ApiRequestStatus that represents a failed status.
 * The failed status doesn't have a target or the id is not yet know (e.g create operation)
 */
export function createFailedStatus(error: unknown): ApiRequestStatus;
export function createFailedStatus(error: unknown, id?: number): unknown {
  return {
    loading: false,
    error,
    ...(id !== undefined ? { targetId: id } : {}),
  };
}
