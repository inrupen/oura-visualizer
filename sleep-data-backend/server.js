const express = require('express');
const multer = require('multer');
const csv = require('csvtojson');
const cors = require('cors');
const moment = require('moment');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const csvString = req.file.buffer.toString();
    const jsonArray = await csv().fromString(csvString);

    const parsedData = jsonArray.map(row => ({
      day: moment(row['day'], 'M/D/YY').format('YYYY-MM-DD'), // Adjust the date format parsing here
      total_sleep_duration: parseFloat(row['total_sleep_duration']) || 0,
      time_in_bed: parseFloat(row['time_in_bed']) || 0,
      awake_time: parseFloat(row['awake_time']) || 0,
      light_sleep_duration: parseFloat(row['light_sleep_duration']) || 0,
      rem_sleep_duration: parseFloat(row['rem_sleep_duration']) || 0,
      deep_sleep_duration: parseFloat(row['deep_sleep_duration']) || 0,
      efficiency: parseFloat(row['efficiency']) || 0,
      average_heart_rate: parseFloat(row['average_heart_rate']) || 0,
      average_hrv: parseFloat(row['average_hrv']) || 0,
      average_breath: parseFloat(row['average_breath']) || 0,
      average_temperature: parseFloat(row['average_temperature']) || 0,
      readiness_score: parseFloat(row['readiness_score']) || 0,
    }));

    const aggregateData = (data, interval) => {
      return data.reduce((acc, curr) => {
        const period = moment(curr.day).startOf(interval).format('YYYY-MM-DD');
        if (!acc[period]) {
          acc[period] = {
            day: period,
            total_sleep_duration: 0,
            time_in_bed: 0,
            awake_time: 0,
            light_sleep_duration: 0,
            rem_sleep_duration: 0,
            deep_sleep_duration: 0,
            efficiency: 0,
            average_heart_rate: 0,
            average_hrv: 0,
            average_breath: 0,
            average_temperature: 0,
            readiness_score: 0,
            count: 0,
          };
        }
        acc[period].total_sleep_duration += curr.total_sleep_duration;
        acc[period].time_in_bed += curr.time_in_bed;
        acc[period].awake_time += curr.awake_time;
        acc[period].light_sleep_duration += curr.light_sleep_duration;
        acc[period].rem_sleep_duration += curr.rem_sleep_duration;
        acc[period].deep_sleep_duration += curr.deep_sleep_duration;
        acc[period].efficiency += curr.efficiency;
        acc[period].average_heart_rate += curr.average_heart_rate;
        acc[period].average_hrv += curr.average_hrv;
        acc[period].average_breath += curr.average_breath;
        acc[period].average_temperature += curr.average_temperature;
        acc[period].readiness_score += curr.readiness_score;
        acc[period].count += 1;
        return acc;
      }, {});
    };

    const calculateAverages = (data) => {
      return Object.values(data).map(entry => ({
        ...entry,
        efficiency: entry.efficiency / entry.count,
        average_heart_rate: entry.average_heart_rate / entry.count,
        average_hrv: entry.average_hrv / entry.count,
        average_breath: entry.average_breath / entry.count,
        average_temperature: entry.average_temperature / entry.count,
        readiness_score: entry.readiness_score / entry.count,
      }));
    };

    const dailyData = parsedData;
    const weeklyData = calculateAverages(aggregateData(parsedData, 'week'));
    const monthlyData = calculateAverages(aggregateData(parsedData, 'month'));

    res.json({
      daily: dailyData,
      weekly: weeklyData,
      monthly: monthlyData,
    });
  } catch (error) {
    console.error('Error parsing CSV:', error);
    res.status(500).send('Error parsing CSV');
  }
});

app.listen(5500, () => {
  console.log('Server started on http://localhost:5500');
});
