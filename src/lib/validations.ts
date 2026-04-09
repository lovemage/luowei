import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, "姓名為必填"),
  phone: z.string().optional().default(""),
  lineId: z.string().optional().default(""),
  email: z.string().email("Email 格式不正確").optional().or(z.literal("")),
  courseName: z.string().min(1, "請選擇課程"),
  message: z.string().optional().default(""),
});
