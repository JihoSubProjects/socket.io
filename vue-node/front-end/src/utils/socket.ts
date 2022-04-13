import io from 'socket.io-client';

const useSocket = () => {
  return io(process.env.VUE_APP_WEBSOCKET_URL, { transports: ['websocket'] });
};

export default useSocket;
