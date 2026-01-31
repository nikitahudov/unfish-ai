export { progressService } from './progressService';
export { quizService } from './quizService';
export { statsService } from './statsService';
export { activityService } from './activityService';
export { dataService } from './dataService';
export { coachService } from './coachService';
export { avatarService } from './avatarService';

// Re-export types
export type { ProgressUpdate } from './progressService';
export type { QuizSubmission } from './quizService';
export type { ActivityType, ActivityMetadata } from './activityService';
export type { ConversationCreate, ConversationUpdate } from './coachService';
export type { UploadResult } from './avatarService';
