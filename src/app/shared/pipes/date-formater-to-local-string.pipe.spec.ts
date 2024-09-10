import { DateFormaterToLocalStringPipe } from './date-formater-to-local-string.pipe';

describe('DateFormaterToLocalStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormaterToLocalStringPipe();
    expect(pipe).toBeTruthy();
  });
});
