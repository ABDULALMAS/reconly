import { Router } from "express";
import { analysisService } from "../analysis/analysis.service";
import { handleError } from "../shared/errors/error-handler";

const router = Router();

router.post("/analyze", async (req, res) => {
  try {
    const report = await analysisService.analyzeCompany(req.body.url);

    return res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    return handleError(error, res);
  }
});
export default router;
