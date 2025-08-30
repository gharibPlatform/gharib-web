export function groupMessages(messages, gapTime = 2 * 60 * 1000, maxGroup = 16) {
  const groups = [];
  let currentGroup = null;

  for (const msg of messages) {
    const lastMsg = currentGroup?.messages[currentGroup.messages.length - 1];

    if (
      !currentGroup ||
      currentGroup.senderId !== msg.sender.id ||
      currentGroup.messages.length >= maxGroup ||
      new Date(msg.created_at) - new Date(lastMsg?.created_at) > gapTime
    ) {
      currentGroup = {
        senderId: msg.sender.id,
        timestamp: msg.created_at,
        messages: [msg],
      };
      groups.push(currentGroup);
    } else {
      currentGroup.messages.push(msg);
    }
  }

  return groups;
}