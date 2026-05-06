import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { StreamStore } from '../../stores/stream.store';
import { Stream } from '../../models/stream.model';

@Component({
    selector: 'app-stream-new',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule
    ],
    templateUrl: './stream-new.component.html',
    styleUrl: './stream-new.component.scss'
})
export class StreamNewComponent implements OnInit {
    private fb = inject(FormBuilder);
    private store = inject(StreamStore);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    channelId: string = '';

    form = this.fb.group({
        mime_type: ['application/x-mpegURL', Validators.required],
        source: ['', Validators.required],
        type: ['hls' as 'hls' | 'dash' | 'smooth_streaming' | 'mp4' | 'm3u', Validators.required],
        url: ['', [Validators.required, Validators.pattern('https?://.+')]],
        drm: [false],
        drm_license: ['']
    });

    ngOnInit(): void {
        this.channelId = this.route.snapshot.paramMap.get('id') || '';
    }

    onSubmit() {
        if (this.form.valid && this.channelId) {
            const stream = this.form.getRawValue() as Partial<Stream>;
            this.store.add({ channelId: this.channelId, stream });
            this.router.navigate(['/channels', this.channelId, 'streams']);
        }
    }
}
