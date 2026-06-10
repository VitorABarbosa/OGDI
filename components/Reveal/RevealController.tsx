"use client";
import { useEffect } from "react";

export function RevealController() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const collectRevealElements = (node: ParentNode) =>
      Array.from(node.querySelectorAll<HTMLElement>(".reveal:not(.visible)"));

    const collectFromAddedNode = (node: Node) => {
      if (!(node instanceof HTMLElement)) return [];
      const els: HTMLElement[] = [];
      if (node.matches(".reveal:not(.visible)")) els.push(node);
      els.push(...collectRevealElements(node));
      return els;
    };

    if (reduce) {
      const show = (node: ParentNode) => collectRevealElements(node).forEach((el) => el.classList.add("visible"));
      show(document);
      const mo = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => collectFromAddedNode(node).forEach((el) => el.classList.add("visible")));
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    collectRevealElements(document).forEach((el) => io.observe(el));

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => collectFromAddedNode(node).forEach((el) => io.observe(el)));
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return null;
}
