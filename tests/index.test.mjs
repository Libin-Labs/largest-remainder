import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('Hare quota example', () => {
  assert.deepEqual(
    api
      .largestRemainder(
        [
          { party: 'a', votes: 100n },
          { party: 'b', votes: 60n },
          { party: 'c', votes: 20n },
        ],
        5,
      )
      .map((x) => x.seats),
    [3, 2, 0],
  );
});
test('tie order', () => {
  assert.deepEqual(
    api
      .largestRemainder(
        [
          { party: 'z', votes: 1n },
          { party: 'a', votes: 1n },
        ],
        1,
      )
      .map((x) => x.seats),
    [0, 1],
  );
});
test('zero support', () => {
  assert.deepEqual(
    api
      .largestRemainder(
        [
          { party: 'a', votes: 0n },
          { party: 'b', votes: 2n },
        ],
        5,
      )
      .map((x) => x.seats),
    [0, 5],
  );
});
test('invalid votes and totals', () => {
  assert.throws(() => api.largestRemainder([{ party: 'a', votes: 0n }], 1));
  assert.throws(() => api.largestRemainder([{ party: 'a', votes: -1n }], 1));
});
test('bad seats and duplicate IDs', () => {
  assert.throws(() => api.largestRemainder([{ party: 'a', votes: 1n }], 0));
  assert.throws(() =>
    api.largestRemainder(
      [
        { party: 'a', votes: 1n },
        { party: 'a', votes: 2n },
      ],
      3,
    ),
  );
});
test('quota floor or ceiling conservation', () => {
  const ps = [
    { party: 'a', votes: 43n },
    { party: 'b', votes: 29n },
    { party: 'c', votes: 11n },
  ];
  for (let n = 1; n <= 100; n++) {
    const r = api.largestRemainder(ps, n);
    assert.equal(
      r.reduce((s, x) => s + x.seats, 0),
      n,
    );
    for (let i = 0; i < 3; i++) {
      const q = (Number(ps[i].votes) * n) / 83;
      assert.ok(r[i].seats === Math.floor(q) || r[i].seats === Math.ceil(q));
    }
  }
});
