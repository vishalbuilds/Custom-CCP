export default function downloadLogs() {
  return connect.core.getEventBus().trigger(connect.EventType.SEND_LOGS);
}
