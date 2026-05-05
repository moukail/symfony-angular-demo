import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Channel } from '../models/channel.model';

export const ChannelActions = createActionGroup({
  source: '[Channels]',
  events: {
    'Load Channels': props<{ channels: Channel[] }>(),
    'Add Channel': props<{ channel: Channel }>(),
    'Upsert Channel': props<{ channel: Channel }>(),
    'Add Channels': props<{ channels: Channel[] }>(),
    'Upsert Channels': props<{ channels: Channel[] }>(),
    'Update Channel': props<{ channel: Update<Channel> }>(),
    'Update Channels': props<{ channels: Update<Channel>[] }>(),
    'Delete Channel': props<{ id: string }>(),
    'Delete Channels': props<{ ids: string[] }>(),
    'Clear Channels': emptyProps(),
  },
});
