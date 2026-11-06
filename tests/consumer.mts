import { largestRemainder } from '@lp-labs/largest-remainder';
if (largestRemainder([{ party: 'a', votes: 10n }], 3)[0].seats !== 3) throw new Error('Seats');
// @ts-expect-error invalid argument must be rejected by declarations
largestRemainder([{ party: 'a', votes: 10 }], 3);
