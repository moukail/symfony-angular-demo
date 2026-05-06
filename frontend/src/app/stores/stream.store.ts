import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { setAllEntities, withEntities, addEntity, removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Stream } from '../models/stream.model';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const StreamStore = signalStore(
  { providedIn: 'root' },
  withState({ isLoading: false, channelId: '' as string }),
  withEntities<Stream>(),
  withMethods((store, apiService = inject(ApiService), snackBar = inject(MatSnackBar)) => ({
    loadByChannel: rxMethod<string>(
      pipe(
        switchMap((channelId) => {
          patchState(store, { isLoading: true, channelId });
          return apiService.getStreams(channelId).pipe(
            tapResponse({
              next: (streams) => {
                patchState(store, setAllEntities(streams), { isLoading: false });
              },
              error: (err) => {
                console.error(err);
                patchState(store, { isLoading: false });
                snackBar.open('Failed to load streams', 'Close', { duration: 3000 });
              },
            })
          );
        })
      )
    ),
    add: rxMethod<{ channelId: string, stream: Partial<Stream> }>(
      pipe(
        switchMap(({ channelId, stream }) => {
          patchState(store, { isLoading: true });
          return apiService.addStream(channelId, stream).pipe(
            tapResponse({
              next: (newStream) => {
                patchState(store, addEntity(newStream), { isLoading: false });
                snackBar.open('Stream added successfully', 'Close', { duration: 3000 });
              },
              error: (err: any) => {
                console.error(err);
                patchState(store, { isLoading: false });
                const message = err.error?.detail || 'Failed to add stream';
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
          return apiService.deleteStream(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, removeEntity(id), { isLoading: false });
                snackBar.open('Stream deleted successfully', 'Close', { duration: 3000 });
              },
              error: (err: any) => {
                console.error(err);
                patchState(store, { isLoading: false });
                snackBar.open('Failed to delete stream', 'Close', { duration: 3000 });
              },
            })
          );
        })
      )
    ),
  }))
);
