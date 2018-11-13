import { ApiConstants } from '../../Constants';
class Api {
  constructor(config) {
    this.config = config;
  }
  /**
   * Gets a list of events.
   */
  async getEvents() {
    const headers = new Headers();
    try {
      const response = await fetch(`${ApiConstants.url}/api/v1/events`, {
        headers: headers,
      });
      const events = await response.json();
      return events;
    } catch (e) {
      console.error(`Error while fetching: ${e}`);
      return [];
    }
  }
}

export const ApiService = new Api();
