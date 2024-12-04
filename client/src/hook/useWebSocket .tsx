import { useState, useEffect } from 'react';

const useWebSocket = (url: string) => {
  const [message, setMessage] = useState<any>(null); 
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setIsOpen(true);
      console.log('WebSocket connected');
    };

    socket.onclose = () => {
      setIsOpen(false);
      console.log('WebSocket disconnected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data); 
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { message, isOpen };
};

export default useWebSocket;
