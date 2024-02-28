export interface NewPlayer {
  id?: number;
  game_id?: string;
  name: string;
  visualization: string;
  role: string;
}

export interface PlayersInGame {
  game_id: number;
  game_name: string;
  game_url: string;
  game_show_cards: number;
  guest_id: number;
  guest_name: string;
  guest_visualization: string;
  guest_role: string;
}
