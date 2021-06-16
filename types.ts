export interface IGoogleServicesJson {
  client?: IClient[];
}

interface IClient {
  client_info?: {
    mobilesdk_app_id?: string;
  };
}
