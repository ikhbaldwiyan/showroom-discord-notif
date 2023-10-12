import { EmbedBuilder } from 'discord.js'
import type WatcherData from './showroom/watcher/core'
import type { ShowroomWatcherOptions } from './types/options'

const liveColor = '#2ddf58'
const finishColor = '#00b0f4'

const config: ShowroomWatcherOptions = {
  delay: {
    check_live: 20000,
    check_live_maintenance: 60000,
    update_message: 60000
  },
  socket: {
    timeout_refresh: 6000,
    no_activity_refresh: 60000
  },
  discord: {
    channel_name: '🔔︱live-notification', // if NODE_ENV=development channel name will be suffixed with "-dev"
    specific_guilds: []
  },
  message: {
    live: (watcher: WatcherData): EmbedBuilder => {
      const name = `${watcher.roomKey.replace('JKT48_', '')} JKT48`
      const giftData = watcher.giftLog.getTop()
      return new EmbedBuilder()
        .setTitle(`${name} lagi live showroom nih!`)
        .setDescription(`Total Gift : \`${giftData?.total ?? 0}\`\n\`\`\`${giftData?.users || 'No gift right now'}\`\`\``)
        .setImage(watcher.image)
        .setColor(liveColor)
        .setFooter({ text: 'Showroom Gift Counter', iconURL: 'https://www.jkt48showroom.com/logo.png' })
        .setURL(`https://www.jkt48showroom.com/room/${watcher.roomKey}/${watcher.id}?type=live-notif`)
    },
    live_end: (watcher: WatcherData): EmbedBuilder => {
      const name = `${watcher.roomKey.replace('JKT48_', '')} JKT48`
      const giftData = watcher.giftLog.getTop()
      return new EmbedBuilder()
        .setTitle(name)
        .setDescription(
          `Live ${watcher.name} telah selesai!` + `\nTotal Gifts : \`${giftData?.total ?? 0}\`` + `\nViewers : \`${watcher?.penonton.peak ?? 0}\``
        )
        .setImage(watcher.image)
        .setColor(finishColor)
        .setTimestamp(new Date().getTime())
        .setFooter({ text: 'Showroom', iconURL: 'https://www.jkt48showroom.com/logo.png' })
        .setURL(`https://www.jkt48showroom.com/room/${watcher.roomKey}/${watcher.id}?type=live-notif`)
    }
  }

}

export default config
