import { useMemo } from 'react';
import { useParams } from 'next/navigation';

function useConversation() {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }
    return params.conversationId;
  }, [params?.conversationId]);

  return useMemo(() => ({
    isOpen: !!conversationId,
    conversationId,
  }), [conversationId]);
}

export default useConversation;