export const svgPath = "m0,0h1v1h-1z"

export const sleep = async (ms: number = 0): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, ms)) }
