import { type Request, type Response, type NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // If headers are already sent, delegate to default Express error handler
    if (res.headersSent) {
      return next(err);
    }

    console.error('[Error Middleware]', err);

    // 1. Zod Validation Errors
    if (err instanceof ZodError) {
      const errorMessages = err.issues.map((issue) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }));
      return res.status(400).json({
        error: 'Validation Error',
        details: errorMessages,
      });
    }

    // 2. Prisma Client Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation
      if (err.code === 'P2002') {
        return res.status(409).json({
          error: 'Conflict',
          message: 'A record with this unique field already exists.',
        });
      }
      // Record not found
      if (err.code === 'P2025') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Record not found.',
        });
      }
    }

    // 3. Syntax Errors (e.g. invalid JSON)
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid JSON payload.',
      });
    }

    // 4. General Server Errors
    const statusCode = (err as any).statusCode || 500;
    const message = (err as any).message || 'Internal Server Error';

    return res.status(statusCode).json({
      error: 'Server Error',
      message,
    });
};
