export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error;
  }
  
  return new APIError(
    error instanceof Error ? error.message : 'An unexpected error occurred'
  );
} 