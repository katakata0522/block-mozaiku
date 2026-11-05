/**
 * Web Audio API による外部音源不使用のプログラム合成効果音エンジン
 * ランタイムの外部通信や音声ファイル読込を一切行わず、ブラウザ内で波形を合成します。
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  public setMuted(mute: boolean): void {
    this.muted = mute;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /** 単一トーンを発音し、終了後にオーディオノードを自動切断してメモリリークを防止するヘルパー */
  private scheduleTone(
    type: OscillatorType,
    startFreq: number,
    endFreq: number,
    startTimeOffset: number,
    duration: number,
    peakGain: number,
    rampType: 'exp' | 'linear' = 'exp'
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const start = ctx.currentTime + startTimeOffset;
    const stopTime = start + duration;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, start);
    if (endFreq !== startFreq) {
      if (rampType === 'exp') {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), stopTime);
      } else {
        osc.frequency.linearRampToValueAtTime(endFreq, stopTime);
      }
    }

    gain.gain.setValueAtTime(peakGain, start);
    gain.gain.exponentialRampToValueAtTime(0.001, stopTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {
        // 既に切断済みの場合は無視
      }
    };

    osc.start(start);
    osc.stop(stopTime + 0.005);
  }

  /** ボール発射音 */
  public playLaunch(): void {
    this.scheduleTone('triangle', 260, 520, 0, 0.11, 0.14);
  }

  /** パドル・壁反射音 */
  public playBounce(isPaddle: boolean): void {
    const baseFreq = isPaddle ? 330 : 240;
    this.scheduleTone('sine', baseFreq, baseFreq * 1.18, 0, 0.055, 0.12);
  }

  /** タイルヒット音（薄くなるときは軽快なチップ音、規定回数到達で完全クリア時は澄んだクリスタル音） */
  public playTileBreak(progressCount: number, isFullyCleared: boolean = true): void {
    const pitchStep = Math.min(30, Math.max(0, progressCount));
    const baseFreq = 420 + pitchStep * 14;

    if (isFullyCleared) {
      this.scheduleTone('triangle', baseFreq, baseFreq * 1.25, 0, 0.11, 0.15);
      this.scheduleTone('triangle', baseFreq * 1.5, baseFreq * 1.85, 0.035, 0.11, 0.15);
    } else {
      this.scheduleTone('sine', baseFreq * 0.85, baseFreq * 1.15, 0, 0.065, 0.13);
    }
  }

  /** ★コアタイル破壊・周囲連鎖爆縮時のズシンと響く重低音＆衝撃音 */
  public playCoreBlast(): void {
    // 重低音サブベース（地響きパンチ）
    this.scheduleTone('triangle', 180, 36, 0, 0.38, 0.35, 'exp');
    this.scheduleTone('sine', 85, 30, 0, 0.48, 0.4, 'exp');
    // 炸裂・破片サウンド（キラめくクリスタル音）
    this.scheduleTone('triangle', 880, 1760, 0.04, 0.24, 0.22, 'linear');
    this.scheduleTone('sine', 1320, 2640, 0.08, 0.2, 0.16, 'linear');
  }

  /** 「わかった」解答欄オープン音 */
  public playAnswerOpen(): void {
    this.scheduleTone('sine', 440, 440, 0, 0.11, 0.11);
    this.scheduleTone('sine', 554.37, 554.37, 0.055, 0.12, 0.11);
  }

  /** 正解時のチャイム */
  public playCorrect(): void {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, idx) => {
      this.scheduleTone('triangle', f, f, idx * 0.075, 0.25, 0.15);
    });
  }

  /** 誤答・落球時のトーン */
  public playMiss(): void {
    this.scheduleTone('sawtooth', 210, 135, 0, 0.23, 0.12, 'linear');
  }

  /** カウントダウン秒針音 */
  public playCountdownTick(): void {
    this.scheduleTone('sine', 600, 600, 0, 0.05, 0.08);
  }
}

export const soundEngine = new SoundEngine();
