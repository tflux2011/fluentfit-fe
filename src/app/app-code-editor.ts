// code-editor.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import { AudioRecorderComponent } from "./audio-recorder.component";

interface CodeTemplate {
  language: string;
  template: string;
}

@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  template: `
    <div class="w-full mb-4 bg-white border border-gray-300 rounded-lg p-0 font-mono text-sm focus:ring-primary-500 focus:border-primary-500">
      <div class="bg-white">
        <!-- Language Selection -->
        <div class="flex justify-between px-3 pt-3 items-center mb-4">
          <div class="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>

            <select 
              [(ngModel)]="selectedLanguage" 
              (ngModelChange)="onLanguageChange()"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              @for(lang of languages; track lang){
                <option [value]="lang.value">
                {{lang.label}}
              </option>
              }
            </select>
          </div>

          <div class="flex space-x-2">
          
            <button 
            (click)="runCode()"
            [disabled]="isRunning"
            class="text-white bg-primary hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 inline-flex items-center"
          >
          
            {{ isRunning ? 'Running...' : 'Run Code' }}
          </button>
          <button 
              (click)="submitPractice()"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
            >
           
              Submit
            </button>
          </div>
          
        </div>

        <!-- Code Editor -->
        <div #codeEditor class="border rounded-lg mb-4"></div>

        <!-- Output Section -->
         @if(output){
        <div class="mt-4 p-3 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Output:</h3>
          <pre class="whitespace-pre-wrap break-words">{{ output }}</pre>
        </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class CodeEditorComponent implements AfterViewInit {
    @ViewChild('codeEditor') codeEditor!: ElementRef;
    @Output() onHandleSavePractise = new EventEmitter<boolean>();
    @Output() codeSubmitted = new EventEmitter<string>();


  languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' }
  ];

  codeTemplates: Record<string, string> = {
    javascript: `// JavaScript code
        function hello(name) {
        console.log(\`Hello, \${name}!\`);
        }

        hello('World');`,
            python: `# Python code
        def hello(name):
            print(f"Hello, {name}!")

        hello('World')`,
            cpp: `// C++ code
        #include <iostream>
        using namespace std;

        int main() {
            cout << "Hello, World!" << endl;
            return 0;
        }`,
            java: `// Java code
        public class HelloWorld {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
            }
        }`
  };

  selectedLanguage = 'javascript';
  output = '';
  isRunning = false;
  editor!: EditorView;

  ngAfterViewInit() {
    this.initializeEditor();
  }

  initializeEditor() {
    this.editor = new EditorView({
      doc: this.codeTemplates[this.selectedLanguage],
      extensions: [
        basicSetup,
        oneDark,
        this.getLanguageExtension(),
        EditorView.theme({
          '.cm-editor': { 
                height: '300px', 
                overflow: 'auto', 
            },
            '.cm-scroller': {
                height: '300px', 
                overflow: 'auto', 
            },
          }),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            // Capture changes if needed
          }
        })
      ],
      parent: this.codeEditor.nativeElement
    });
  }

  getLanguageExtension() {
    const languageExtensions: Record<string, any> = {
      javascript: javascript(),
      python: python(),
      cpp: cpp(),
      java: java()
    };
    return languageExtensions[this.selectedLanguage];
  }

  onLanguageChange() {
    const currentContent = this.editor.state.doc.toString();
  
    if (
      confirm(
        `Switching to ${this.selectedLanguage} will overwrite the current code. Do you want to proceed?`
      )
    ) {
      // Update editor content
      this.editor.dispatch({
        changes: {
          from: 0,
          to: currentContent.length,
          insert: this.codeTemplates[this.selectedLanguage],
        },
      });
    }
  }

  runCode() {
    this.isRunning = true;
    this.output = 'Running...';

    // Simulated code execution
    setTimeout(() => {
      this.output = 'Code execution simulated!';
      this.isRunning = false;
    }, 1500);
  }

  submitPractice(){
    this.onHandleSavePractise.emit(true);
    const codeContent = this.editor.state.doc.toString();
    this.codeSubmitted.emit(codeContent);
  }
}