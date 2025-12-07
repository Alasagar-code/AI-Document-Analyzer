import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Shared/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-text sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">AI Document</span>{' '}
                  <span className="block text-primary xl:inline">Analyzer</span>
                </h1>
                <p className="mt-3 text-base text-text/80 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Upload any PDF document and get instant AI-powered insights, summaries, and key points extracted automatically.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button variant="primary" as={Link} to="/dashboard" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                  <Button variant="secondary" as={Link} to="/history" className="w-full sm:w-auto">
                    View History
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
            alt="AI analyzing documents"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-secondary/5">
        <div className="container mx-auto">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text sm:text-4xl">
              Powerful AI Document Analysis
            </p>
            <p className="mt-4 max-w-2xl text-xl text-text/80 lg:mx-auto">
              Our advanced AI extracts meaningful insights from your documents automatically.
            </p>
          </div>

          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text">PDF Upload & Text Extraction</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text/80">
                  Upload any PDF document and our system will automatically extract all text content for analysis.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text">AI-Powered Summarization</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text/80">
                  Get concise summaries of lengthy documents with key information highlighted.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text">Key Points & Insights</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text/80">
                  Extract the most important points and insights from your documents automatically.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text">Sentiment & Tone Analysis</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text/80">
                  Understand the sentiment and tone of the document's content for deeper insights.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="container mx-auto">
          <div className="py-16 px-4 text-center">
            <h2 className="text-3xl font-extrabold text-text sm:text-4xl">
              <span className="block">Ready to analyze your documents?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-text/80">
              Join thousands of users who are leveraging AI to extract insights from their documents.
            </p>
            <div className="mt-8">
              <Button variant="outline" as={Link} to="/dashboard" className="w-full sm:w-auto">
                Start Analyzing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
