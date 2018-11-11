export interface SlackSlashCommandBody {
  token: string;
  command: string;
  text: string;
  response_url: string;
  trigger_id: any;
  user_id: any;
  user_name: string;
  team_id: any;
  channel_id: any;
}
