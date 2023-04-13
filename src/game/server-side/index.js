/* eslint-disable global-require */
/* eslint-disable no-console */

// В дев режиме сборка клиента и сервера в watch режиме запускаются параллельно с запуском сервера, одной комендой.
// Если модуль ../../../distServer/sockets не существует, значит вебпак не собрал сервер (скорее всего сейчас собирает)
// Вместо ошибки отображаем лог в консоль
try {
  const { startServer } = require('../../../distServer/sockets')
  startServer()
} catch {
  console.log('Сервер пока не собран')
}
