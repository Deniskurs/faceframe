"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Textarea } from "@/components/ui/textarea";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export const AskQuestionSection: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [questionsUsed, setQuestionsUsed] = useState(0);

  // Character count
  const charCount = question.length;
  const maxChars = 500;
  const minChars = 10;

  // Load rate limiting data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("faq-rate-limit");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const now = Date.now();

        if (now < data.resetTime) {
          setQuestionsUsed(data.count || 0);
          const remaining = Math.ceil((data.resetTime - now) / 1000);
          setCooldownRemaining(remaining > 0 ? remaining : 0);
        } else {
          // Reset expired data
          localStorage.removeItem("faq-rate-limit");
        }
      } catch {
        localStorage.removeItem("faq-rate-limit");
      }
    }
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setTimeout(() => {
        setCooldownRemaining(cooldownRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownRemaining]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setQuestion(value);
      // Clear error when user starts typing
      if (error) setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (question.trim().length < minChars) {
      setError(`Question must be at least ${minChars} characters.`);
      return;
    }

    if (questionsUsed >= 3) {
      setError(
        "You've reached the limit of 3 questions per 5 minutes. Please wait before asking another question."
      );
      return;
    }

    if (cooldownRemaining > 0) {
      setError("Please wait before asking another question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/faq-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited - update local state
          setQuestionsUsed(3);
          setCooldownRemaining(300); // 5 minutes
          localStorage.setItem(
            "faq-rate-limit",
            JSON.stringify({
              count: 3,
              resetTime: Date.now() + 5 * 60 * 1000,
            })
          );
        }
        throw new Error(data.error || "Failed to get answer");
      }

      setAnswer(data.answer);

      // Update local rate limiting
      const newCount = questionsUsed + 1;
      setQuestionsUsed(newCount);
      localStorage.setItem(
        "faq-rate-limit",
        JSON.stringify({
          count: newCount,
          resetTime: Date.now() + 5 * 60 * 1000,
        })
      );

      // Set a small cooldown between questions (30 seconds)
      setCooldownRemaining(30);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    question.trim().length >= minChars &&
    !loading &&
    cooldownRemaining === 0 &&
    questionsUsed < 3;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <section id="ask-ai-question" className="py-16 md:py-20 bg-light-cream">
      <div className="luxury-container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-alice text-2xl sm:text-3xl text-elegant-mocha uppercase tracking-[0.2em] mb-4">
              Still have a question?
            </h2>

            <div className="h-[1px] w-16 bg-elegant-mocha/30 mx-auto mb-6" />

            <p className="font-alta text-elegant-mocha/80 leading-relaxed font-medium">
              Ask your own question and we&apos;ll do our best to answer it
              instantly.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASING, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <Label
                htmlFor="question"
                className="font-alice text-sm text-elegant-mocha tracking-[0.1em] uppercase"
              >
                Your Question
              </Label>
              <div className="relative">
                <Textarea
                  id="question"
                  value={question}
                  onChange={handleInputChange}
                  placeholder="Type your beauty question here..."
                  className="min-h-[120px] font-alice text-base leading-relaxed tracking-wide text-elegant-mocha placeholder:text-elegant-mocha/50 border-elegant-mocha/20 bg-white/80 backdrop-blur-sm focus-visible:ring-elegant-mocha/20 focus-visible:border-elegant-mocha/40 resize-none"
                  disabled={
                    loading || (questionsUsed >= 3 && cooldownRemaining > 0)
                  }
                  rows={4}
                />

                {/* Character counter */}
                <div className="absolute bottom-3 right-3 text-xs font-alta text-elegant-mocha/60">
                  {charCount}/{maxChars}
                </div>
              </div>
            </div>

            {/* Rate limiting info */}
            {questionsUsed > 0 && (
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="ghost" className="font-alta">
                  Questions used: {questionsUsed}/3
                </Badge>
                {cooldownRemaining > 0 && (
                  <Badge variant="luxury" className="font-alta">
                    Next question in: {formatTime(cooldownRemaining)}
                  </Badge>
                )}
              </div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert variant="destructive">
                  <AlertDescription className="font-alta font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Submit button */}
            <div className="text-center">
              <LuxuryShadcnButton
                type="submit"
                text="GET ANSWER"
                luxuryVariant="elegant"
                luxuryTheme="light"
                luxurySize="medium"
                className="min-w-[200px] justify-center"
                disabled={!isFormValid}
                isLoading={loading}
              />
            </div>
          </motion.form>

          {/* Answer display */}
          {answer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: LUXURY_EASING }}
            >
              <Card className="mt-8 bg-white/90 backdrop-blur-sm border-elegant-mocha/20 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="font-alice text-base sm:text-lg text-elegant-mocha uppercase tracking-[0.12em]">
                    Answer from IGGY
                  </CardTitle>
                  <div className="h-[1px] w-12 bg-elegant-mocha/20 mt-3" />
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="font-alice text-base md:text-lg text-elegant-mocha leading-relaxed tracking-wide">
                    {answer}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
