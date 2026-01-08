import { type Request, type Response } from "express";
declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { register, login };
//# sourceMappingURL=authController.d.ts.map