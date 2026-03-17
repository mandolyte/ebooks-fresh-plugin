 /*
 * To Do - add some documentation
 */

// Reusable insert string function at cursor position
function insert_string(val: string) : boolean {
    const bufferId = editor.getActiveBufferId();
    const cursorInfo = editor.getPrimaryCursor();
    const cursorPos = cursorInfo.position;
    
    const success = editor.insertText(bufferId, cursorPos, val);
    return success;
}

type UnicodeCharacterLabel = 
  | "em-dash" 
  | "en-dash" 
  | "left-single-quote" 
  | "right-single-quote" 
  | "left-double-quote" 
  | "right-double-quote" 
  | "word-joiner" 
  | "unknown";

/**
 * Identifies specific Unicode punctuation and formatting characters.
 */
function identifySpecialCharacter(char: string): UnicodeCharacterLabel {
  switch (char) {
    // Dashes
    case '\u2014': 
      return "em-dash";
    case '\u2013': 
      return "en-dash";

    // Single Quotes
    case '\u2018': 
      return "left-single-quote";
    case '\u2019': 
      return "right-single-quote";

    // Double Quotes
    case '\u201C': 
      return "left-double-quote";
    case '\u201D': 
      return "right-double-quote";

    // Formatting
    case '\u2060': 
      return "word-joiner";

    default:
      return `unknown`;
  }
}

 
// Global action: Insert Em Dash
function insert_em_dash(val: string) : void {
    const em_dash = "—";
    const success = insert_string(em_dash);
    if (!success) {
        editor.setStatus("Failed to insert Em Dash: ${em_dash}");
        return;
    }
    const statusMessage = `Inserted Em Dash (${em_dash})`;
    editor.setStatus(statusMessage);
}
registerHandler("insert_em_dash", insert_em_dash);

// Global action: Insert En Dash
function insert_en_dash(val: string) : void {
    const en_dash = "–";
    const success = insert_string(en_dash);
    if (!success) {
        editor.setStatus("Failed to insert En Dash: ${en_dash}");
        return;
    }
    const statusMessage = `Inserted En Dash (${en_dash}) `;
    editor.setStatus(statusMessage);
}
registerHandler("insert_en_dash", insert_en_dash);

// Global action: Insert Left Single Quote
function insert_left_single_quote(val: string) : void {
    const quote = '\u2018';
    const success = insert_string(quote);
    if (!success) {
        editor.setStatus("Failed to insert left single quote: ${quote}");
        return;
    }
    const statusMessage = `Inserted left single quote (${quote}) `;
    editor.setStatus(statusMessage);
}
registerHandler("insert_left_single_quote", insert_left_single_quote);

// Global action: Insert Right Single Quote
function insert_right_single_quote(val: string) : void {
    const quote = '\u2019';
    const success = insert_string(quote);
    if (!success) {
        editor.setStatus("Failed to insert right single quote: ${quote}");
        return;
    }
    const statusMessage = `Inserted right single quote (${quote}) `;
    editor.setStatus(statusMessage);
}
registerHandler("insert_right_single_quote", insert_right_single_quote);

// Global action: Insert Right Double Quote
function insert_right_double_quote(val: string) : void {
    const quote = '\u201D';
    const success = insert_string(quote);
    if (!success) {
        editor.setStatus("Failed to insert right double quote: ${quote}");
        return;
    }
    const statusMessage = `Inserted right double quote (${quote}) `;
    editor.setStatus(statusMessage);
}
registerHandler("insert_right_double_quote", insert_right_double_quote);

// Global action: Insert Left Double Quote
function insert_left_double_quote(val: string) : void {
    const quote = '\u201C';
    const success = insert_string(quote);
    if (!success) {
        editor.setStatus("Failed to insert left double quote: ${quote}");
        return;
    }
    const statusMessage = `Inserted left double quote (${quote}) `;
    editor.setStatus(statusMessage);
}
registerHandler("insert_left_double_quote", insert_left_double_quote);


// Global action: Identify Unicode Character
async function identify_unicode_character(val: string) : void {
    const cursorInfo = editor.getPrimaryCursor();
    const bufferId = editor.getActiveBufferId();

    if (! cursorInfo.selection) {
        editor.setStatus(`Nothing is highlighted!`);
        return;
    }
    const startSelection = cursorInfo.selection.start;
    const endSelection = cursorInfo.selection.end;
    const bufText = await editor.getBufferText(bufferId, startSelection, endSelection);
    let namedCharacter: string = identifySpecialCharacter(bufText);
    if (namedCharacter == "unknown") {
        namedCharacter = `Unamed character:${bufText}`
    }
    
    const statusMessage = `Unicode character is: ${namedCharacter}`;
    editor.setStatus(statusMessage);
}
registerHandler("identify_unicode_character", identify_unicode_character);







// Global action: Replace selection with double quoted selection
async function double_quote_selection() : void {
  const rquote = '\u201D';
  const lquote = '\u201C';

  const bufferId = editor.getActiveBufferId();
  const cursorInfo = editor.getPrimaryCursor();
  if (! cursorInfo.selection) {
      editor.setStatus(`Nothing is highlighted!`);
  }
  const startSelection = cursorInfo.selection.start;
  const endSelection = cursorInfo.selection.end;
  const bufText = await 
      editor.getBufferText(bufferId, startSelection, endSelection);

  let success = editor.insertText(bufferId, endSelection, rquote);
  if (!success) {
    editor.setStatus("Failed to insert end quote");
    return
  }
  success = editor.insertText(bufferId, startSelection, lquote);
  if (!success) {
    editor.setStatus("Failed to insert start quote");
    return;
  }

  const statusMessage = `Quoted: ${bufText}`;
  editor.setStatus(statusMessage)
}
registerHandler("double_quote_selection", double_quote_selection);
// Global action: Replace selection with single quoted selection
async function single_quote_selection() : void {
  const rquote = '\u2019';
  const lquote = '\u2018';

  const bufferId = editor.getActiveBufferId();
  const cursorInfo = editor.getPrimaryCursor();
  if (! cursorInfo.selection) {
      editor.setStatus(`Nothing is highlighted!`);
  }
  const startSelection = cursorInfo.selection.start;
  const endSelection = cursorInfo.selection.end;
  const bufText = await 
      editor.getBufferText(bufferId, startSelection, endSelection);

  let success = editor.insertText(bufferId, endSelection, rquote);
  if (!success) {
    editor.setStatus("Failed to insert end quote");
    return
  }
  success = editor.insertText(bufferId, startSelection, lquote);
  if (!success) {
    editor.setStatus("Failed to insert start quote");
    return;
  }

  const statusMessage = `Quoted: ${bufText}`;
  editor.setStatus(statusMessage)
}
registerHandler("single_quote_selection", single_quote_selection);
 
/*
*
* Command Registrations
*
*/

// Identify Unicode
editor.registerCommand(
  "EBooks: Identify Unicode Character",
  "Identify Unicode Character",
  "identify_unicode_character"
);

// Dashes
editor.registerCommand(
  "EBooks: Insert Em-Dash",
  "Insert Em-Dash",
  "insert_em_dash"
);
editor.registerCommand(
  "EBooks: Insert En-Dash",
  "Insert En-Dash",
  "insert_en_dash"
);

// Quotes
editor.registerCommand(
  "EBooks: Insert Left Single Quote",
  "Insert Left Single Quote",
  "insert_left_single_quote"
);
editor.registerCommand(
  "EBooks: Insert Right Single Quote",
  "Insert Right Single Quote",
  "insert_right_single_quote"
);
editor.registerCommand(
  "EBooks: Insert Left Double Quote",
  "Insert Left Double Quote",
  "insert_left_double_quote"
);
editor.registerCommand(
  "EBooks: Insert Right Double Quote",
  "Insert Right Double Quote",
  "insert_right_double_quote"
);

// String Transformations
editor.registerCommand(
  "Ebooks: Double Quote Selection",
  "Double Quote Selection",
  "double_quote_selection"
);
editor.registerCommand(
  "Ebooks: Single Quote Selection",
  "Single Quote Selection",
  "single_quote_selection"
);
