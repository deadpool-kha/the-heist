const cases = [
    {
        id: "museum-diamond",
        title: "THE MISSING DIAMOND",
        location: "Ravenwood Museum",
        difficulty: "MEDIUM",

        intro:
            "At 11:47 PM, the museum's most valuable diamond vanished from a locked display. The alarm triggered for exactly 13 seconds before going silent.",

        objective:
            "One person in this room is the thief. Investigate the evidence, compare everyone's stories, and identify who stole the diamond.",

        timeline: [
            "11:30 PM — The museum closes to visitors.",
            "11:38 PM — The security system enters night mode.",
            "11:42 PM — Someone is seen near the east entrance.",
            "11:46 PM — The display case is still intact.",
            "11:47 PM — The alarm activates.",
            "11:48 PM — The diamond is discovered missing."
        ],

        evidence: [
            {
                id: "broken-glass",
                title: "BROKEN DISPLAY GLASS",
                type: "PHYSICAL",
                description:
                    "The display case has a small crack near the bottom corner. Most of the glass is still intact.",
                clue:
                    "The damage appears to have been caused from inside the case."
            },
            {
                id: "security-log",
                title: "SECURITY LOG",
                type: "DIGITAL",
                description:
                    "The security system recorded an access event at 11:42 PM.",
                clue:
                    "The access event came from the east entrance."
            },
            {
                id: "wet-footprints",
                title: "WET FOOTPRINTS",
                type: "PHYSICAL",
                description:
                    "Several wet footprints were found near the east entrance.",
                clue:
                    "It had been raining outside for approximately 30 minutes."
            },
            {
                id: "alarm-recording",
                title: "ALARM RECORDING",
                type: "AUDIO",
                description:
                    "The alarm activated at 11:47 PM and stopped 13 seconds later.",
                clue:
                    "Someone manually interrupted the alarm."
            }
        ]
    }
];

function getRandomCase() {
    return cases[Math.floor(Math.random() * cases.length)];
}
