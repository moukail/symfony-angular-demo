import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Channel } from '../models/channel.model';
import { ChannelActions } from '../actions/channel.actions';

export const channelsFeatureKey = 'channels';

export interface State extends EntityState<Channel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Channel> = createEntityAdapter<Channel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ChannelActions.addChannel, (state, action) => adapter.addOne(action.channel, state)),
  on(ChannelActions.upsertChannel, (state, action) => adapter.upsertOne(action.channel, state)),
  on(ChannelActions.addChannels, (state, action) => adapter.addMany(action.channels, state)),
  on(ChannelActions.upsertChannels, (state, action) => adapter.upsertMany(action.channels, state)),
  on(ChannelActions.updateChannel, (state, action) => adapter.updateOne(action.channel, state)),
  on(ChannelActions.updateChannels, (state, action) => adapter.updateMany(action.channels, state)),
  on(ChannelActions.deleteChannel, (state, action) => adapter.removeOne(action.id, state)),
  on(ChannelActions.deleteChannels, (state, action) => adapter.removeMany(action.ids, state)),
  on(ChannelActions.loadChannels, (state, action) => adapter.setAll(action.channels, state)),
  on(ChannelActions.clearChannels, (state) => adapter.removeAll(state)),
);

export const channelsFeature = createFeature({
  name: channelsFeatureKey,
  reducer,
  extraSelectors: ({ selectChannelsState }) => ({
    ...adapter.getSelectors(selectChannelsState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } = channelsFeature;
