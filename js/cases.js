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
        ],

        /*
         * Structured facts allow the game to detect
         * contradictions without requiring AI.
         */
        investigationFacts: [
            {
                id: "east-entrance",
                category: "LOCATION",
                time: "11:42 PM",
                description:
                    "Someone accessed the east entrance at 11:42 PM.",
                keywords: [
                    "east entrance",
                    "east door",
                    "entrance",
                    "east"
                ]
            },
            {
                id: "alarm-interruption",
                category: "ALARM",
                time: "11:47 PM",
                description:
                    "The alarm was manually interrupted 13 seconds after activation.",
                keywords: [
                    "alarm",
                    "13 seconds",
                    "interrupted",
                    "disabled",
                    "stopped"
                ]
            },
            {
                id: "display-condition",
                category: "DISPLAY",
                time: "11:46 PM",
                description:
                    "The display case was still intact at 11:46 PM.",
                keywords: [
                    "display",
                    "case",
                    "glass",
                    "intact"
                ]
            }
        ]
    }
];

rounds: [
    {
        round: 1,
        title: "THE INCIDENT",
        testimonyPrompt: "Describe where you were when the diamond disappeared and what you noticed before the alarm.",

        evidence: [
            {
                id: "broken-glass",
                title: "BROKEN DISPLAY GLASS",
                type: "PHYSICAL",
                clue: "The damage appears to have been caused from inside the case."
            },
            {
                id: "security-log",
                title: "SECURITY LOG",
                type: "DIGITAL",
                clue: "An access event was recorded at the east entrance at 11:42 PM."
            },
            {
                id: "alarm-recording",
                title: "ALARM RECORDING",
                type: "AUDIO",
                clue: "The alarm was manually interrupted 13 seconds after activation."
            }
        ]
    },

    {
        round: 2,
        title: "THE ACCESS",
        testimonyPrompt:
            "The investigation has uncovered new access records. Explain where you were when the east entrance was accessed and whether you had access to the security system.",
        evidence: [
            {
                id: "access-credential",
                title: "ACCESS CREDENTIAL",
                type: "DIGITAL",
                clue: "The 11:42 PM east entrance access was made using a credential assigned to someone inside the museum."
            },
            {
                id: "wet-footprints",
                title: "WET FOOTPRINTS",
                type: "PHYSICAL",
                clue: "Fresh footprints lead from the east entrance toward the restricted exhibition hall."
            },
            {
                id: "security-gap",
                title: "SECURITY GAP",
                type: "DIGITAL",
                clue: "The east entrance camera stopped recording for 47 seconds shortly after the access event."
            }
        ]
    },

    {
        round: 3,
        title: "THE CONTRADICTION",
        testimonyPrompt:
            "The final evidence has revealed serious contradictions. Give your final account of what happened and explain anything that investigators may have misunderstood.",
        evidence: [
            {
                id: "hidden-switch",
                title: "HIDDEN RELEASE",
                type: "PHYSICAL",
                clue: "The display mechanism contains a concealed release switch that can open the case without breaking the front glass."
            },
            {
                id: "alarm-control",
                title: "ALARM CONTROL",
                type: "DIGITAL",
                clue: "The alarm interruption required access to the museum's internal control panel."
            },
            {
                id: "final-recording",
                title: "FINAL RECORDING",
                type: "AUDIO",
                clue: "A recovered audio fragment places someone inside the restricted hall immediately before the alarm."
            }
        ]
    }
]

function getRandomCase() {
    return cases[Math.floor(Math.random() * cases.length)];
}

function getRandomCase() {
    return cases[Math.floor(Math.random() * cases.length)];
}
