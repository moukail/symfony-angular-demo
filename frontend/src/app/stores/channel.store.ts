import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { setAllEntities, withEntities, addEntity, removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Channel } from '../models/channel.model';
import { ChannelService } from '../services/channel.service';

import { MatSnackBar } from '@angular/material/snack-bar';

export const ChannelStore = signalStore(
  { providedIn: 'root' },
  withState({ isLoading: false }),
  withEntities<Channel>(),
  withMethods((store, channelService = inject(ChannelService), router = inject(Router), snackBar = inject(MatSnackBar)) => ({
    loadAll: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { isLoading: true });
          return channelService.getChannels().pipe(
            tapResponse({
              next: (channels) => {
                patchState(store, setAllEntities(channels), { isLoading: false });
              },
              error: (err) => {
                console.error(err);
                patchState(store, { isLoading: false });
                snackBar.open('Failed to load channels', 'Close', { duration: 3000 });
              },
            })
          );
        })
      )
    ),
    add: rxMethod<Omit<Channel, 'id'>>(
      pipe(
        switchMap((channel) => {
          patchState(store, { isLoading: true });
          return channelService.addChannel(channel).pipe(
            tapResponse({
              next: (newChannel) => {
                patchState(store, addEntity(newChannel), { isLoading: false });
                snackBar.open('Channel created successfully', 'Close', { duration: 3000 });
                router.navigate(['/channels']);
              },
              error: (err: any) => {
                console.error(err);
                patchState(store, { isLoading: false });
                const message = err.error?.detail || 'Failed to create channel';
                snackBar.open(message, 'Close', { duration: 5000 });
              },
            })
          );
        })
      )
    ),
    delete: rxMethod<string>(
      pipe(
        switchMap((id) => {
          patchState(store, { isLoading: true });
          return channelService.deleteChannel(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, removeEntity(id), { isLoading: false });
                snackBar.open('Channel deleted successfully', 'Close', { duration: 3000 });
              },
              error: (err: any) => {
                console.error(err);
                patchState(store, { isLoading: false });
                const message = err.error?.detail || 'Failed to delete channel';
                snackBar.open(message, 'Close', { duration: 5000 });
              },
            })
          );
        })
      )
    ),
  }))
);
