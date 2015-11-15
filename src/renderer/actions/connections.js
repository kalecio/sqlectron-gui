import { sqlectron } from '../../browser/remote';


export const CONNECTION_REQUEST = 'CONNECTION_REQUEST';
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';
export const CONNECTION_FAILURE = 'CONNECTION_FAILURE';


export function connect (id, database) {
  return async (dispatch, getState) => {
    const { servers } = getState();
    const server = servers.items.find(srv => srv.id === id);

    dispatch({ type: CONNECTION_REQUEST, server, database });
    try {
      await sqlectron.db.connect(server, database);
      dispatch({ type: CONNECTION_SUCCESS, server, database });
    } catch (error) {
      dispatch({ type: CONNECTION_FAILURE, server, database, error });
    }
  };
}