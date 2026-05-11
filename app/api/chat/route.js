//FUTURE
// Ai handling the routing for chat interactions, including intent detection, fetching live weather data, and generating AI responses based on the user's message. It uses the OpenAI API to create dynamic and informative responses while ensuring that the content is relevant to weather, climate, and environmental topics.
import { OpenAI } from "openai";
import { SYSTEM_PROMPT } from "../../../lib/aiPrompt";
import { extractCity } from "../../../lib/weatherCache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  if (!message || message.length > 500) {
    return new Response("⚠️ Message too long. Keep it under 500 characters.", {
      status: 400,
    });
  }

  const encoder = new TextEncoder();

  const streamText = (text) =>
    new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(text));
        controller.close();
      },
    });

  try {
    // ===============================
    // STEP 1: AI INTENT DETECTION
    // ===============================
    const intentRes = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an intent classifier.

Return ONLY one word:

LIVE_WEATHER → if user wants current weather data (today, now, temperature in a place)
WEATHER_CONCEPT → if user asks why/how/effects of weather
GENERAL_ENV → environment/climate topics
ALYIKA → if asking about the assistant
OUT_OF_SCOPE → anything unrelated

No explanation. One word only.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const intent =
      intentRes.choices[0]?.message?.content?.trim() || "GENERAL_ENV";

    // ===============================
    //  ALYIKA RESPONSE
    // ===============================
    if (intent === "ALYIKA") {
      return new Response(
        streamText(
          "I’m Alyika, your learning companion that explains weather, climate and environmental sustainability topics in a simple and conversational way. I love sharing information that can inspire you to care for our planet and make eco-friendly choices. If you have any questions about the environment or how to live sustainably, feel free to ask! Let’s learn together!",
        ),
        {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        },
      );
    }

    // ===============================
    //  OUT OF SCOPE
    // ===============================
    if (intent === "OUT_OF_SCOPE") {
      return new Response(
        streamText(
          "Sorry, I can only help with weather, climate, environment, and sustainability topics.",
        ),
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    }

    // ===============================
    //  LIVE WEATHER (API + AI)
    // ===============================
    if (intent === "LIVE_WEATHER") {
      try {
        const city = extractCity(message) || "Lagos";

        const weatherRes = await fetch(`${req.nextUrl.origin}/api/weather`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        });

        const weatherData = await weatherRes.json();

        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Here is real-time weather data: ${JSON.stringify(
                weatherData,
              )}. Explain it simply.`,
            },
          ],
        });

        return streamResponse(stream, encoder);
      } catch (error) {
        console.error("Weather error:", error);
        return new Response(
          streamText("❌ Couldn't fetch weather right now."),
          { status: 500 },
        );
      }
    }

    // ===============================
    //  EVERYTHING ELSE (AI)
    // ===============================
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    return streamResponse(stream, encoder);
  } catch (error) {
    console.error("AI error:", error);
    return new Response(streamText("⚠️ Something went wrong."), {
      status: 500,
    });
  }
}

// ===============================
//  STREAM HELPER
// ===============================
function streamResponse(stream, encoder) {
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    }),
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
}

//============================
// Current code for testing
//===========================
// import { OpenAI } from "openai";
// import {
//   isConceptQuestion,
//   isLiveWeatherQuery,
//   isWeatherQuery,
// } from "../../../lib/isWeatherQuery";
// import { SYSTEM_PROMPT } from "../../../lib/aiPrompt";
// import { extractCity } from "../../../lib/weatherCache";
// import { isEnvironmentRelated } from "../../../lib/isEnvironmentRelated";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   const { message } = await req.json();

//   if (!message || message.length > 500) {
//     return new Response("⚠️ Message too long. Keep it under 500 characters.", {
//       status: 400,
//     });
//   }

//   const encoder = new TextEncoder();

//   // ===============================
//   //  HELPERS
//   // ===============================
//   function isAlyikaQuestion(message) {
//     const msg = message.toLowerCase();

//     return (
//       msg.includes("who are you") ||
//       msg.includes("tell me about yourself") ||
//       msg.includes("what are you") ||
//       msg.includes("what is alyika") ||
//       msg.includes("tell me about alyika")
//     );
//   }

//   const streamText = (text) =>
//     new ReadableStream({
//       start(controller) {
//         controller.enqueue(encoder.encode(text));
//         controller.close();
//       },
//     });

//   // ===============================
//   // INTENT DETECTION
//   // ===============================
//   const isWeather = isWeatherQuery(message);
//   const isConcept = isConceptQuestion(message);
//   const isLiveWeather = isLiveWeatherQuery(message);
//   const isAlyika = isAlyikaQuestion(message);
//   const isRelated = await isEnvironmentRelated(message);

//   // ===============================
//   // ALYIKA IDENTITY
//   // ===============================
//   if (isAlyika) {
//     return new Response(
//       streamText(
//         "I’m Alyika, your learning companion that explains weather, climate and environmental sustainability topics in a simple and conversational way. I love sharing information that can inspire you to care for our planet and make eco-friendly choices. If you have any questions about the environment or how to live sustainably, feel free to ask! Let’s learn together!",
//       ),
//       {
//         headers: { "Content-Type": "text/plain; charset=utf-8" },
//       },
//     );
//   }

//   // ===============================
//   //  OUT OF SCOPE (STRICT)
//   // ===============================
//   if (!isWeather && !isRelated) {
//     return new Response(
//       streamText(
//         "Sorry, I can only help with weather, climate, environment, and sustainability topics.",
//       ),
//       { headers: { "Content-Type": "text/plain; charset=utf-8" } },
//     );
//   }

//   // ===============================
//   // Fetch LIVE WEATHER DATA (API)
//   // ===============================
//   if (isWeather && isLiveWeather && !isConcept) {
//     try {
//       const city = extractCity(message) || "Lagos";

//       const weatherRes = await fetch(`${req.nextUrl.origin}/api/weather`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ city }),
//       });

//       const weatherData = await weatherRes.json();

//       const stream = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         stream: true,
//         messages: [
//           { role: "system", content: SYSTEM_PROMPT },
//           {
//             role: "user",
//             content: `Here is real-time weather data: ${JSON.stringify(
//               weatherData,
//             )}. Explain it simply.`,
//           },
//         ],
//       });

//       return streamResponse(stream, encoder);
//     } catch (error) {
//       console.error("Weather API error:", error);
//       return new Response(streamText("❌ Couldn't fetch weather right now."), {
//         status: 500,
//       });
//     }
//   }

//   // ===============================
//   // Explain WEATHER CONCEPT (AI)
//   // ===============================
//   if (isWeather && isConcept) {
//     try {
//       const stream = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         stream: true,
//         messages: [
//           { role: "system", content: SYSTEM_PROMPT },
//           {
//             role: "user",
//             content: `Explain this weather/climate concept clearly for a student: ${message}`,
//           },
//         ],
//       });

//       return streamResponse(stream, encoder);
//     } catch (error) {
//       console.error("Concept AI error:", error);
//       return new Response(streamText("⚠️ Something went wrong."), {
//         status: 500,
//       });
//     }
//   }

//   // ===============================
//   //  GENERAL ENVIRONMENT (AI)
//   // ===============================
//   try {
//     const stream = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       stream: true,
//       messages: [
//         { role: "system", content: SYSTEM_PROMPT },
//         { role: "user", content: message },
//       ],
//     });

//     return streamResponse(stream, encoder);
//   } catch (error) {
//     console.error("Fallback AI error:", error);
//     return new Response(streamText("⚠️ Something went wrong."), {
//       status: 500,
//     });
//   }
// }

// // ===============================
// // STREAM HELPER
// // ===============================
// function streamResponse(stream, encoder) {
//   return new Response(
//     new ReadableStream({
//       async start(controller) {
//         for await (const chunk of stream) {
//           const text = chunk.choices[0]?.delta?.content || "";
//           if (text) controller.enqueue(encoder.encode(text));
//         }
//         controller.close();
//       },
//     }),
//     {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     },
//   );
// }

// //====================== OLD CODE FOR REFERENCE ======================
// // import { OpenAI } from "openai";
// // import {
// //   isConceptQuestion,
// //   isLiveWeatherQuery,
// //   isWeatherQuery,
// // } from "../../../lib/isWeatherQuery";
// // import { SYSTEM_PROMPT } from "../../../lib/aiPrompt";
// // import { extractCity } from "../../../lib/weatherCache";
// // import { isEnvironmentRelated } from "../../../lib/isEnvironmentRelated";

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // export async function POST(req) {
// //   const { message } = await req.json();

// //   if (!message || message.length > 500) {
// //     return new Response("⚠️ Message too long. Keep it under 500 characters.", {
// //       status: 400,
// //     });
// //   }

// //   const encoder = new TextEncoder();

// //   function isAlyikaQuestion(message) {
// //     const msg = message.toLowerCase();

// //     return (
// //       msg.includes("who are you") ||
// //       msg.includes("tell me about yourself") ||
// //       msg.includes("what are you") ||
// //       msg.includes("what is alyika") ||
// //       msg.includes("tell me about alyika")
// //     );
// //   }

// //   const streamText = (text) =>
// //     new ReadableStream({
// //       start(controller) {
// //         controller.enqueue(encoder.encode(text));
// //         controller.close();
// //       },
// //     });

// //   const isRelated = await isEnvironmentRelated(message);
// //   const isAlyika = isAlyikaQuestion(message);
// //   const isLiveWeather = isLiveWeatherQuery(message);
// //   const isConcept = isConceptQuestion(message);

// //   if (isAlyikaQuestion(message)) {
// //     return new Response(
// //       streamText(
// //         "I’m Alyika, your learning companion that explains weather, climate and environmental sustainability topics in a simple and conversational way. I love sharing information that can inspire you to care for our planet and make eco-friendly choices. If you have any questions about the environment or how to live sustainably, feel free to ask! Let’s learn together!",
// //       ),
// //       {
// //         headers: { "Content-Type": "text/plain; charset=utf-8" },
// //       },
// //     );
// //   }

// //   if (!isRelated && !isAlyika) {
// //     return new Response(
// //       streamText(
// //         "Sorry, I can only help with weather, climate, environment, and sustainability topics.",
// //       ),
// //       { headers: { "Content-Type": "text/plain; charset=utf-8" } },
// //     );
// //   }

// //   // WEATHER (API and AI explanation)
// //   // if (isWeatherQuery(message)) {
// //   //   try {
// //   //     const city = extractCity(message) || "Lagos";

// //   //     const weatherRes = await fetch(`${req.nextUrl.origin}/api/weather`, {
// //   //       method: "POST",
// //   //       headers: { "Content-Type": "application/json" },
// //   //       body: JSON.stringify({ city }),
// //   //     });

// //   //     const weatherData = await weatherRes.json();

// //   //     const stream = await openai.chat.completions.create({
// //   //       model: "gpt-4o-mini",
// //   //       stream: true,
// //   //       messages: [
// //   //         { role: "system", content: SYSTEM_PROMPT },
// //   //         {
// //   //           role: "user",
// //   //           content: `Here is real-time weather data: ${JSON.stringify(weatherData)}. Explain it simply.`,
// //   //         },
// //   //       ],
// //   //     });

// //   //     return streamResponse(stream, encoder);
// //   //   } catch {
// //   //     console.error("Weather API error:", error);
// //   //     return new Response(streamText("❌ Couldn't fetch weather right now."), {
// //   //       status: 500,
// //   //     });
// //   //   }
// //   // }

// //   // ✅ ONLY fetch API for live weather
// //   if (isLiveWeather && !isConcept) {
// //     try {
// //       const city = extractCity(message) || "Lagos";

// //       const weatherRes = await fetch(`${req.nextUrl.origin}/api/weather`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ city }),
// //       });

// //       const weatherData = await weatherRes.json();

// //       const stream = await openai.chat.completions.create({
// //         model: "gpt-4o-mini",
// //         stream: true,
// //         messages: [
// //           { role: "system", content: SYSTEM_PROMPT },
// //           {
// //             role: "user",
// //             content: `Here is real-time weather data: ${JSON.stringify(
// //               weatherData,
// //             )}. Explain it simply.`,
// //           },
// //         ],
// //       });

// //       return streamResponse(stream, encoder);
// //     } catch (error) {
// //       console.error("Weather API error:", error);
// //       return new Response(streamText("❌ Couldn't fetch weather right now."), {
// //         status: 500,
// //       });
// //     }
// //   }
// //   try {
// //     const stream = await openai.chat.completions.create({
// //       model: "gpt-4o-mini",
// //       stream: true,
// //       messages: [
// //         { role: "system", content: SYSTEM_PROMPT },
// //         { role: "user", content: message },
// //       ],
// //     });

// //     return streamResponse(stream, encoder);
// //   } catch {
// //     return new Response(streamText("⚠️ Something went wrong."), {
// //       status: 500,
// //     });
// //   }
// // }

// // // helper
// // function streamResponse(stream, encoder) {
// //   return new Response(
// //     new ReadableStream({
// //       async start(controller) {
// //         for await (const chunk of stream) {
// //           const text = chunk.choices[0]?.delta?.content || "";
// //           if (text) controller.enqueue(encoder.encode(text));
// //         }
// //         controller.close();
// //       },
// //     }),
// //     {
// //       headers: { "Content-Type": "text/plain; charset=utf-8" },
// //     },
// //   );
// // }
