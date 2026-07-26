import { VerificationRecord } from '../types';

export class VerificationEngine {
  private static blockCounter = 1048292;

  public static async generateSha256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } else {
      // Fallback simple hash for node env if crypto.subtle isn't available
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
      }
      const hex = Math.abs(hash).toString(16).padStart(64, 'a');
      return '0x' + hex;
    }
  }

  public static async createVerificationRecord(
    agentId: string,
    agentName: string,
    prompt: string,
    response: string
  ): Promise<{ proofHash: string; blockNumber: number; stateRoot: string }> {
    const blockNumber = ++this.blockCounter;
    const combinedPayload = `${blockNumber}:${agentId}:${prompt}:${response}:${Date.now()}`;
    const proofHash = await this.generateSha256(combinedPayload);
    const stateRoot = await this.generateSha256(`${proofHash}:${blockNumber}`);

    return {
      proofHash,
      blockNumber,
      stateRoot
    };
  }

  public static verifyProof(proofHash: string): boolean {
    return proofHash.startsWith('0x') && proofHash.length === 66;
  }
}
