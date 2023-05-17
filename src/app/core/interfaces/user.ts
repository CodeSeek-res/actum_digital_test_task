export interface SearchUserDTO {
  items: UserDTO[];
  total_count: number;
}

export interface UserDTO {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  events_url: string;
  score: number;
  site_admin: boolean;
}
