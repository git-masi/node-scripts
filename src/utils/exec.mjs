import { exec } from 'child_process';
import util from 'util';

/**
 * @returns {() => Promise<{stdout, stderr}>}
 */
export const execAsync = util.promisify(exec);
