import { byText, createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let spectator: SpectatorHost<CardComponent>;
  const createHost = createHostFactory(CardComponent);

  beforeEach(() => (spectator = createHost(`<app--card>Hello</app--card>`)));

  it('Should make sure all inputs are plugged correctly', () => {
    expect(spectator.component.padding).toBe('0px');
    expect(spectator.component.fullHeight).toBe(false);
    expect(spectator.component.overFlowX).toBe('auto');

    spectator.setInput('padding', '10px');
    spectator.setInput('fullHeight', true);
    spectator.setInput('overFlowX', 'visible');

    expect(spectator.component.padding).toBe('10px');
    expect(spectator.component.fullHeight).toBe(true);
    expect(spectator.component.overFlowX).toBe('visible');

    // check rendered content
    expect(spectator.query(byText('Hello'))).toExist();
  });
});
