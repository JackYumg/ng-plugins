export const lctDefaultValue: {[key: string]: string} = {
    lct: '```mermaid\ngraph TD\nA[Christmas] -->|Get money| B(Go shopping)\nB --> C{Let me think}\nC -->|One| D[Laptop]\nC -->|Two| E[iPhone]\nC -->|Three| F[fa:fa-car Car]\n```\n',
    sxt: '```mermaid\nsequenceDiagram\nAlice->>+John: Hello John, how are you?\nAlice->>+John: John, can you hear me?\nJohn-->>-Alice: Hi Alice, I can hear you!\nJohn-->>-Alice: I feel great!\n```\n',
    ztt: '```mermaid\nstateDiagram-v2\n[*] --> Still\nStill --> [*]\nStill --> Moving\nMoving --> Still\nMoving --> Crash\nCrash --> [*] \n```\n',
    lt: '```mermaid\nclassDiagram\n    Animal <|-- Duck\n    Animal <|-- Fish\n    Animal <|-- Zebra\n    Animal : +int age\n    Animal : +String gender\n    Animal: +isMammal()\n    Animal: +mate()\n    class Duck{\n      +String beakColor\n      +swim()\n      +quack()\n    }\n    class Fish{\n      -int sizeInFeet\n      -canEat()\n    }\n    class Zebra{\n      +bool is_wild\n      +run()\n    } \n```\n',
    bt: '```mermaid\npie title Pets adopted by volunteers\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15 \n```\n',
    gtt: '```mermaid\ngantt\n    title A Gantt Diagram\n    dateFormat  YYYY-MM-DD\n    section Section\n    A task           :a1, 2014-01-01, 30d\n    Another task     :after a1  , 20d\n    section Another\n    Task in sec      :2014-01-12  , 12d\n    another task      : 24d \n```\n',
    ert: '```mermaid\nerDiagram\n    CUSTOMER }|..|{ DELIVERY-ADDRESS : has\n    CUSTOMER ||--o{ ORDER : places\n    CUSTOMER ||--o{ INVOICE : "liable for"\n    DELIVERY-ADDRESS ||--o{ ORDER : receives\n    INVOICE ||--|{ ORDER : covers\n    ORDER ||--|{ ORDER-ITEM : includes\n    PRODUCT-CATEGORY ||--|{ PRODUCT : contains\n    PRODUCT ||--o{ ORDER-ITEM : "ordered in"\n```\n',
};


export const BaseConfig = {
    fileurl: 'http://118.195.182.168:8001/fileapi/'
};
