-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_sensorId_key" ON "Prediction"("sensorId");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "SensorData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
