function capitalizeSentences(text) {
    return text.replace(/(^\s*\w|[.!?]\s*\w)/g, letter => letter.toUpperCase());
}

document.getElementById("inputText").addEventListener("input", () => {
    const count = document.getElementById("inputText").value.trim().split(/\s+/).filter(Boolean).length;
    document.getElementById("inputWordCount").textContent = `Words: ${count}`;
});

document.getElementById("summarizeBtn").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;
    const summaryOutput = document.getElementById("summaryOutput");
    const summarizeBtn = document.getElementById("summarizeBtn");

    if (!inputText.trim()) {
        summaryOutput.textContent = "Please enter something.";
        return;
    }

    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < 100) {
        summaryOutput.textContent = "Please enter at least 100 words.";
        return;
    }

    if (wordCount > 799) {
        summaryOutput.textContent = "Please enter no more than 800 words.";
        return;
    }

    summarizeBtn.disabled = true;        //  disable button here
    summaryOutput.textContent = "Processing...";
    document.getElementById("outputWordCount").textContent = "Words: 0";

    try {
        const response = await fetch('/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });

        const result = await response.json();
        console.log("Server returned:", result);

        if (result.error) {
            summaryOutput.textContent = "Something went wrong, please try again.";
            return;
        }

        const summary = capitalizeSentences(result.summary);
        summaryOutput.textContent = summary;

        const outputCount = summary.trim().split(/\s+/).filter(Boolean).length;
        document.getElementById("outputWordCount").textContent = `Words: ${outputCount}`;

    } catch (error) {
        summaryOutput.textContent = "Something went wrong, please try again.";
        console.error(error);
    } finally {
        summarizeBtn.disabled = false;   //  always re-enable here
    }
});