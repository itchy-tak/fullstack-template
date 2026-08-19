import { SetMetadata } from '@nestjs/common';

export const SKIP_INTERNAL_SECRET_KEY = 'skipInternalSecret';

export const SkipInternalSecret = () => SetMetadata(SKIP_INTERNAL_SECRET_KEY, true);
